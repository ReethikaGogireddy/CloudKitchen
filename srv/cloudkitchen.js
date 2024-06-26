const cds = require("@sap/cds");

module.exports = cds.service.impl(async function () {
  const productapi = await cds.connect.to("API_PRODUCT_SRV");

  this.on("READ", "Products", async (req) => {
    //console.log(req.query.SELECT.from);
    req.query.SELECT.columns = [
      { ref: ["Product"] },
      { ref: ["ProductType"] },
      { ref: ["ProductGroup"] },
      { ref: ["Division"] },
      { ref: ["to_Description"], expand: ["*"] },
    ];
    let res = await productapi.run(req.query);
    console.log(res);

    res.forEach((element) => {
      element.to_Description.forEach((item) => {
        if ((item.Language = "EN")) {
          element.ProductDescription = item.ProductDescription;
        }
      });
    });

    //console.log(res);
    return res;
  });

  this.before("READ", "ProductLocal", async (req, res) => {
    const { Products, ProductLocal } = this.entities;
    console.log("fired read");
    let query = SELECT.from(Products)
      .columns([
        { ref: ["Product"] },
        { ref: ["ProductType"] },
        { ref: ["ProductGroup"] },
        { ref: ["Division"] },
        { ref: ["to_Description"], expand: ["*"] },
      ])
      .limit(10);
    res = await productapi.run(query);
    res.forEach((element) => {
      element.to_Description.forEach((item) => {
        if ((item.Language = "EN")) {
          element.ProductDescription = item.ProductDescription;
        }
      });
      delete element.to_Description;
    });
    insquery = UPSERT.into(ProductLocal).entries(res);
    await cds.run(insquery);
  });

  // this.before("UPDATE", "ProductLocal", async (req, res) => {
  //   const { Products, ProductLocal, ProductDescription } = this.entities;
  //   //console.log(req.data);
  //   //console.log("update fired");
  //   // req.data.to_Description = [
  //   //   {
  //   //     Language: "EN",
  //   //     ProductDescription: req.data.ProductDescription,
  //   //     Product: req.data.Product,
  //   //   },
  //   // ];
  //   updatequery = UPDATE(ProductDescription)
  //     .data({ Productdescription: req.data.Productdescription })
  //     .where({ Product: req.data.Product, Language: "EN" });
  //   await productapi.run(updatequery);
  // });

  this.before("UPDATE", "ProductLocal", async (req) => {
    const { Products, ProductLocal, ProductDescription } = this.entities;
    console.log(req.data);
    console.log("Fired Update");

    //delete(req.data.ProductDescription);
    console.log(req.data);
    updqry = UPDATE(ProductDescription)
      .data({ ProductDescription: req.data.ProductDescription })
      .where({ Product: req.data.Product, Language: "EN" });
    await productapi.run(updqry);
  });
});
