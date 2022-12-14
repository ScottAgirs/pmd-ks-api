/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { KeystoneContext } from '@keystone-6/core/types';
import { getSlug } from '../../../utils/text';

interface BeforeCreateCompanyInput {
  context: KeystoneContext;
  inputData: any;
  resolvedData: {
    id?: string;
    registeredBy?: any;
    slug?: string;
    name: string;
  };
}

export const beforeCreateCompany = async ({
  context,
  resolvedData,
}: BeforeCreateCompanyInput) => {
  const currentUser = context.session?.data;
  if (!currentUser)
    throw new Error('[err.intent] Must be logged in to create Company.');

  const slug = getSlug(resolvedData.name);

  const matchExistingSlug = await context.db.Company.findMany({
    where: { slug: { equals: slug } },
  });
  const isSlugTaken = matchExistingSlug.length > 0;

  if (isSlugTaken) {
    throw new Error(
      `[err.intent] Company name is too similar or taken. Please try a different one.`
    );
  }

  resolvedData.slug = slug;
  resolvedData.registeredBy = { connect: { id: currentUser?.id } };
};
