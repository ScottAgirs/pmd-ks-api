/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { KeystoneContext } from '@keystone-6/core/types';
import { getSlug } from '../../../utils/text';

interface BeforeCreateCompanyLocationInput {
  context: KeystoneContext;
  inputData: any;
  resolvedData: {
    id?: string;
    registeredBy?: any;
    slug?: string;
    name: string;
  };
}

export const beforeCreateCompanyLocation = async ({
  context,
  resolvedData,
}: BeforeCreateCompanyLocationInput) => {
  const currentUser = context.session?.data;
  if (!currentUser)
    throw new Error(
      '[err.intent] Must be logged in to create CompanyLocation.'
    );

  const slug = getSlug(resolvedData.name);

  const matchExistingSlug = await context.db.CompanyLocation.findMany({
    where: { slug: { equals: slug } },
  });
  const isSlugTaken = matchExistingSlug.length > 0;

  if (isSlugTaken) {
    throw new Error(
      `[err.intent] CompanyLocation name is too similar or taken. Please try a different one.`
    );
  }

  resolvedData.slug = slug;
  resolvedData.registeredBy = { connect: { id: currentUser?.id } };
};
