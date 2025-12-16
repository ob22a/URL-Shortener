import { redirectToOriginal } from "../controller/redirectController.js"; 
import { shortenUrl } from "../controller/shortenController.js";
import { Router } from "express";

const router = Router();

router.get("/:shortCode", redirectToOriginal);
router.post("/shorten", shortenUrl);

export default router;