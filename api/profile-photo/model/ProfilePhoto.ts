import 'dotenv/config';

import { relationship, text } from '@keystone-6/core/fields';
import { cloudinaryImage } from '@keystone-6/cloudinary';
import { KeystoneContext } from '@keystone-6/core/types';
import { list } from '@keystone-6/core';

import { cloudinary, cloudinaryConfig } from '../../../lib/cloudinary';

export const ProfilePhoto = list({
  fields: {
    altText: text(),
    src: cloudinaryImage({
      cloudinary: { ...cloudinaryConfig, folder: 'profile-photos' },
      label: 'Source',
    }),
    user: relationship({ ref: 'User.profilePhoto' }),
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
