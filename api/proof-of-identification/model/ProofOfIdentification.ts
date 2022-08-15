import 'dotenv/config';

import { checkbox, relationship, text } from '@keystone-6/core/fields';
import { cloudinaryImage } from '@keystone-6/cloudinary';
import { KeystoneContext } from '@keystone-6/core/types';

import { list } from '@keystone-6/core';
import { cloudinary, cloudinaryConfig } from '../../../lib/cloudinary';

export const ProofOfIdentification = list({
  fields: {
    altText: text(),
    isVerified: checkbox(),
    src: cloudinaryImage({
      cloudinary: { ...cloudinaryConfig, folder: 'proof-of-identification' },
      label: 'Source',
    }),
    // eslint-disable-next-line sort-keys
    doctor: relationship({ ref: 'Doctor.proofOfIdentification' }),
  },
  hooks: {
    afterOperation: async ({
      operation,
      originalItem,
    }: {
      context: KeystoneContext;
      item: any;
      operation: string;
      originalItem: any;
    }) => {
      if (operation === 'delete') {
        cloudinary.uploader.destroy(
          originalItem.src._meta.public_id,
          {
            invalidate: true,
          },
          (error, result) => {
            console.log(result, error);
          }
        );
      }
    },
  },

  ui: {
    // isHidden: true,
  },
});
