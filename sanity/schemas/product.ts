export default {
  name: "product", //Tells Sanity Studio that the JSON gets -> "_type": "pet"
  type: "document", //To make new pet documents
  title: "Product", //Title of the document type
  fields: [
    {
      name: "name", //Key of the output data in sanity studio
      type: "string", //Built-in field type
      title: "Name",
    },
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      options: {
        source: "name", //To slugify the name
      },
    },
    {
      name: "images",
      type: "array",
      title: "Images",
      of: [{ type: "image" }], //To define each of the array element
    },
    {
      name: "category",
      type: "string",
      title: "Category",
    },
    {
      name: "sizes",
      type: "array",
      title: "Sizes",
      of: [{ type: "string" }],
    },
    {
      name: "color",
      type: "string",
      title: "Color",
    },
    {
      name: "description",
      type: "string",
      title: "Description",
    },
    {
      name: "currency",
      type: "string",
      title: "Currency",
    },
    {
      name: "price",
      type: "number",
      title: "Price",
    },
  ],
};
