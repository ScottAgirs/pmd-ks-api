import { KeystoneContext } from '@keystone-6/core/types';

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
