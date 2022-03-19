import { KeystoneContext } from "@keystone-6/core/types";

export const resetList = async (listName: String, context: KeystoneContext) => {
  const allItems = await context.db[listName as string].findMany();
  if (allItems.length > 0) {
    const deleted = await context.db[listName as string].deleteMany({
      where: allItems.map((i) => ({ id: i.id as string })),
    });
    console.log("resetList :: deleted", deleted);
    return console.log(
      `Deleted all (total of ${deleted.length}) items from ${listName} list.`
    );
  } else {
    console.log(`resetList :: no ${listName} items to delete`);
    return null;
  }
};
