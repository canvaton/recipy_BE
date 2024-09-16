import recipeMethods from "../models/recipeMethods";
import type { Request, Response } from "express";

class recipeControllers {

  async addRecipe (req: Request, res : Response)  {

    try {
      const {recipeLink} = req.body
      const recipe =  await recipeMethods.addRecipe(recipeLink)
      res.status(201).send(recipe)
    } catch(error) {
      console.log(error)
      res.status(500).send('Could not create recipe')
    }
  
  }
}

export default new recipeControllers()