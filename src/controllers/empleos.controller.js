import Empleo from "../models/Empleo.js";

export const renderEmpleoForm = (req, res) => res.render("empleos/new-empleo");

export const createNewEmpleo = async (req, res) => {
    const {  email, description } = req.body;
    const errors = [];
  
    if (!email) {
        errors.push({ text: "Tu Email." });
    }
    if (!description) {
        errors.push({ text: "Escribenos por una oferta Laboral" });
    }
    if (errors.length > 0)
        return res.render("empleos/new-empleo", {
            errors,
            
            email,
            description,
        });

    const newEmpleo = new Empleo({  email, description });
    newEmpleo.user = req.user.id;
    await newEmpleo.save();
    req.flash("success_msg", "Postulacion Realizada");
    res.redirect("/");
};

export const renderEmpleos = async (req, res) => {
    const empleos = await empleos.find({ user: req.user.id })
        .sort({ date: "desc" })
        .lean();
    res.render("empleos/all-empleo", { empleos });
};

export const renderEditsForm = async (req, res) => {
    const empleo = await Empleo.findById(req.params.id).lean();
    if (empleo.user != req.user.id) {
        req.flash("error_msg", "Sin Autorización");
        return res.redirect("/empleos");
    }
    res.render("empleos/edit-empleo", { empleo });
};




export const deleteEmpleo = async (req, res) => {
    await Empleo.findByIdAndDelete(req.params.id);
    req.flash("success_msg", "La postulación se borro con exito");
    res.redirect("/empleos");
};
