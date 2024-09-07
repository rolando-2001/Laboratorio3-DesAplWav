import { Router } from "express";

const router = Router();

let categorias = [
  {
    id: 1,
    nombre: "Categoria 1",
    descripcion: "Descripcion de la categoria 1",
  },
  {
    id: 2,
    nombre: "Categoria 2",
    descripcion: "Descripcion de la categoria 2",
  },
  {
    id: 3,
    nombre: "Categoria 3",
    descripcion: "Descripcion de la categoria 3",
  },
];

//--------LISTADO --------------------------------------------//
router.get("/listcat", async (req, res) => {
  try {
    res.render("categoria/listcat", { categorias });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/addcat", (req, res) => {
  res.render("categoria/addcat");
});

router.post("/addcat", async (req, res) => {
  try {
    const { nomcli, apecli } = req.body;
    console.log(req.body);
    const id = categorias.length + 1;
    categorias.push({ id, nombre: nomcli, descripcion: apecli });
    res.redirect("/listcat");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//--------ACTUALIZAR --------------------------------------------//
router.get("/editcat/:id", (req, res) => {
  const Id = parseInt(req.params.id, 10);
  const categoria = categorias.find((categoria) => categoria.id === Id);

  res.render("categoria/editcat", { categoria });
});

router.post("/editcat/:id", async (req, res) => {
  try {
    const Id = parseInt(req.params.id, 10);
    const { nombre, descripcion } = req.body;

    categorias = categorias.map((categoria) => {
    
        if (categoria.id === Id) {
        categoria.nombre = nombre;
        categoria.descripcion = descripcion;
      }

      return categoria;
    });

    res.redirect("/listcat");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//--------ELIMINAR --------------------------------------------//
router.post("/eleminar/:id", (req, res) => {
  try {
    const Id = parseInt(req.params.id, 10);
    categorias = categorias.filter((categoria) => categoria.id !== Id);
    setTimeout(() => {
        res.redirect("/listcat")
    },
    2000);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar la categoría" });
  }
});

export default router;
