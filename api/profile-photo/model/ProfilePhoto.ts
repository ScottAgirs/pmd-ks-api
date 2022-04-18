import "dotenv/config";

import { relationship, text } from "@keystone-6/core/fields";
import { cloudinaryImage } from "@keystone-6/cloudinary";
import { cloudinary, cloudinaryConfig } from "../../../lib/cloudinary";
import { KeystoneContext } from "@keystone-6/core/types";

const { list } = require("@keystone-6/core");

export const ProfilePhoto = list({
  ui: {
    // isHidden: true,
  },
  hooks: {
    afterOperation: async ({
      context,
      item,
      operation,
      originalItem,
    }: {
      context: KeystoneContext;
      item: any;
      operation: string;
      originalItem: any;
    }) => {
      if (operation === "delete") {
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
  fields: {
    src: cloudinaryImage({
      cloudinary: { ...cloudinaryConfig, folder: "profile-photos" },
      label: "Source",
    }),
    altText: text(),
    user: relationship({ ref: "User.profilePhoto" }),
  },
});
