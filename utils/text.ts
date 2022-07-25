import slugify from "slugify";

export const getSlug = (text: string) => {    
    const slug = slugify(text, {
    replacement: "-", // replace spaces with replacement character, defaults to `-`
    lower: true, // convert to lower case, defaults to `false`
    strict: true, // strip special characters except replacement, defaults to `false`
    trim: true, // trim leading and trailing replacement chars, defaults to `true`
    });

    return slug;
}