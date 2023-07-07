import { Router } from 'express';
const appLogin = Router();


appLogin.get("/:id?", (req, res) => {
    res.send("Login");
})

export default appLogin;