const data = {
  users: [
    {
      id: "usr_01HJZ",
      name: "Alex Mercer",
      email: "alex.mercer@cybernet.io",
      role: "Admin",
      status: "Active"
    },
    {
      id: "usr_02KFX",
      name: "Elena Rostova",
      email: "elena.r@neotech.org",
      role: "User",
      status: "Active"
    },
    {
      id: "usr_03MPQ",
      name: "Zane Kuro",
      email: "kuro.zane@quantum.tech",
      role: "Developer",
      status: "Suspended"
    }
  ],

  clothes: [
    {
      sku: "CLO-TH-091",
      item: "Techwear Matte Hooded Jacket",
      category: "Outerwear",
      color: "Obsidian Black",
      size: "L",
      stock: 42
    },
    {
      sku: "CLO-TP-104",
      item: "Modular Cargo Pants",
      category: "Bottoms",
      color: "Cyber Cyan",
      size: "M",
      stock: 18
    },
    {
      sku: "CLO-TE-012",
      item: "Oversized Minimalist Graphic Tee",
      category: "T-Shirts",
      color: "Chalk White",
      size: "XL",
      stock: 85
    }
  ],

  shoes: [
    {
      sku: "SH-NEO-88",
      model: "Phantom Runner X1",
      brand: "Aether",
      color: "Stealth Black / Neon Cyan",
      size: 10.5,
      price: 145.00
    },
    {
      sku: "SH-ORB-23",
      model: "Orbit Knit Loafers",
      brand: "Helix",
      color: "Monochrome Gray",
      size: 9.0,
      price: 110.00
    }
  ],

  medicines: [
    {
      code: "MED-PAR-500",
      name: "Paracetamol",
      dosage: "500mg",
      form: "Tablet",
      requiresPrescription: false,
      expiry: new Date("2028-04-01")
    },
    {
      code: "MED-AMO-250",
      name: "Amoxicillin",
      dosage: "250mg",
      form: "Capsule",
      requiresPrescription: true,
      expiry: new Date("2027-11-01")
    }
  ],

  products: [
    {
      id: "prod_771A",
      name: "Mechanical Keyboard (Hot-swappable)",
      specs: {
        layout: "75%",
        switches: "Linear Silent",
        backlight: "RGB"
      },
      price: 89.99
    },
    {
      id: "prod_882B",
      name: "4K Ultra-Wide Monitor",
      specs: {
        size: "34 inch",
        panel: "IPS",
        refreshRate: 144
      },
      price: 449.99
    }
  ]
};


const {users , clothes , shoes , medicines, products} = data
module.exports ={
    users,
    clothes,
    shoes,
    medicines,
    products
}