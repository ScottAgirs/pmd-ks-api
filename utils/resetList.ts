/* eslint-disable no-console */
import { KeystoneContext } from '@keystone-6/core/types';

// export async function resetList(listName: string, context: KeystoneContext) {
//   const itemDB = context.db[listName as string];

//   console.log(`----------------------------------------`);
//   console.log(`About to fetch and reset ${listName} list`);
//   console.log(`----------------------------------------`);

//   const allItems = (await context.db[listName as string].findMany()) as [];

//   console.log('☢️ resetList :: found for nuke ', allItems?.length);

//   const deleteItem = async () => {
//     if (!allItems.length) {
//       console.log(`⭕ ${listName} has no records to delete`);
//     } else {
//       const deleted = await itemDB.deleteMany({
//         where: allItems.map((i: any) => ({ id: i.id as string })),
//       });

//       console.log(`Deleted ${deleted.length} ${listName} entries.`);
//     }
//   };

//   // eslint-disable-next-line no-restricted-syntax
//   for (const item of allItems) {
//     console.log(`[X] Deleting med: ${item.brandName}`);
//     // eslint-disable-next-line no-await-in-loop
//     await deleteItem();
//   }
// }

export const resetList = async (listName: string, context: KeystoneContext) => {
  console.log('About to fetch and reset');
  const allItems = await context.db[listName as string].findMany({
    take: 16000,
  });

  console.log('resetList :: taken ', allItems?.length);

  if (allItems.length > 0) {
    try {
      const deleted = await context.db[listName as string].deleteMany({
        where: allItems.map(i => ({ id: i.id as string })),
      });

      return console.log(`Deleted ${deleted.length} ${listName} entries.`);
    } catch (error) {
      return console.log('resetList :: error', error);
    }
  } else {
    return console.log(`resetList :: no ${listName} items to delete`);
  }
};
