import prisma from "../../database/prismaClient";
import { Request, Response, NextFunction } from "express";
import { PermissionError } from "../../errors/PermissionError";
import { compare } from "bcrypt";
import { JwtPayload, sign, verify } from "jsonwebtoken";
import statusCodes from "../../utils/constants/statusCodes";
import { User } from "@prisma/client";
import { TokenError } from "../../errors/TokenError";

function generateJWT(user: User, res: Response) {
    const body = {
        id: user.id_User,
        email: user.email,
        role: user.admin,
        name: user.username
    };

    const token = sign({user: body}, process.env.SECRET_KEY || "", {expiresIn: Number(process.env.JWT_EXPIRATION)});

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development"
    })
}

function cookieExtractor(req: Request){
    let token = null;
    if (req.cookies) {
        token = req.cookies["jwt"];
    }
    return token;  
}

export function verifyJWT(req: Request, res: Response, next: NextFunction){
    try {
        const token = cookieExtractor(req);
        if (token) {
            const decoded = verify(token, process.env.SECRET_KEY || "") as JwtPayload;
            req.user = decoded.user;
        }

        if (req.user == null) {
            throw new TokenError("É necessário estar logado para realizar esta ação!")
        }

        next();

    } catch (error) {
        next(error);
    }
}

export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await prisma.user.findUnique({ 
            where: {
                email: req.body.email
            }
        });

        if (!user) {
            throw new PermissionError("Email e/ou senha incorretos!")
        } 

        const match = compare(req.body.password, user.password);

        if (!match) {
            throw new PermissionError("Email e/ou senha incorretos!")
        } 

        generateJWT(user, res);

        res.status(statusCodes.SUCCESS).json("Login realizado com sucesso!")
    } catch (error) {
        next(error)
    }
}

export async function notLoggedIn(req: Request, res: Response, next: NextFunction) {
    try {

    } catch (error) {
        next (error);
    }
}

export async function logout(req: Request, res: Response, next: NextFunction) {
    try {

    } catch (error) {
        next (error);
    }
}

export async function checkRole(req: Request, res: Response, next: NextFunction) {
    try {
        if (req.user?.admin !== true && req.body.admin == true) {
            throw new PermissionError("Somente administradores podem designar outros administradores!");
        }
        res.status(statusCodes.ACCEPTED).json()
    } catch (error) {
        next (error);
    }
}