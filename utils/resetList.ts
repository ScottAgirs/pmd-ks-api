import { KeystoneContext } from "@keystone-6/core/types";

export const resetList = async (listName: String, context: KeystoneContext) => {
  console.log("About to fetch and reset");
  const allItems = await context.db[listName as string].findMany();
  console.log("resetList :: allItems.length", allItems?.length);
  if (allItems.length > 0) {
    try {
      const deleted = await context.db[listName as string].deleteMany({
        where: allItems.map((i) => ({ id: i.id as string })),
      });
      console.log("resetList :: deleted", deleted);
      return console.log(
        `Deleted all (total of ${deleted.length}) items from ${listName} list.`
      );
    } catch (error) {
      console.log("resetList :: error", error);
    }
  } else {
    console.log(`resetList :: no ${listName} items to delete`);
    return null;
  }
};
