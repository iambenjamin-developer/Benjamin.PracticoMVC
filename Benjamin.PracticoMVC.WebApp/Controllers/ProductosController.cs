﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Benjamin.PracticoMVC.WebApp.Controllers
{
    public class ProductosController : Controller
    {
        // ABM de productos como administrador
        public ActionResult ABM()
        {
            return View();
        }


        //Json que obtiene la lista de todos los producto
        public JsonResult Listar()
        {

            AccesoDatos.Productos metodos = new AccesoDatos.Productos();

            var lista = metodos.Listar();

            return Json(lista, JsonRequestBehavior.AllowGet);

        }
    }
}