import { NextFunction, Request, Response } from "express";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { CreateUserBody, DeleteUserBody, PatchUserBody, UpdateUserBody } from "../validations/userSchema.js";

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { name, email, password } = req.body as CreateUserBody;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            res.status(409).json({
                success: false,
                message: "User already exists.",
            });
            return;
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashPassword
        });

        if (!newUser) {
            res.status(500).json({
                success: false,
                message: ("Failed to create user")
            });
            return;
        }

        res.status(201).json({
            success: true,
            message: "User Created Successfully.",
            user: newUser
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: ["Internal Server Error", error instanceof Error ? error.message : "Unknown error"]
        })
    }
}

export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const users = await User.find().select('-password');

        res.status(200).json({
            success: true,
            count: users.length,
            users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: ["Internal Sevrver Error", error instanceof Error ? error.message : "Unknown error"]
        });
    }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = await req.params;
        const { name, email, password } = req.body as UpdateUserBody;

        const user = await User.findById(id);

        if (!user) {
            res.status(404).json({
                success: false,
                message: "User Not found"
            });
            return;
        }

        const matchPassword = await bcrypt.compare(password, user.password);

        if (!matchPassword) {
            res.status(401).json({
                success: false,
                message: "Invalid Password"
            });
            return;
        }

        user.name = name;
        user.email = email;
        await user.save();

        res.status(200).json({
            succes: true,
            message: "User updated successfully.",
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: ["Internal Server Error", error instanceof Error ? error.message : "Unknown Error"]
        });
    }
}

export const patchUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = await req.params;
        const { name, email, password } = req.body as PatchUserBody;

        const user = await User.findById(id);
        if (!user) {
            res.status(404).json({
                success: false,
                message: "User Not found"
            });
            return;
        }
        const matchPassword = await bcrypt.compare(password, user.password);

        if (!matchPassword) {
            res.status(401).json({
                success: false,
                message: "Invalid Password"
            });
            return;
        }

        if (name) user.name = name;
        if (email) user.email = email;
        await user.save();

        res.status(200).json({
            succes: true,
            message: "User updated successfully.",
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: ["Internal Server Error", error instanceof Error ? error.message : "Unknown Error"]
        });
    }
}


export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = await req.params;
        const { password } = req.body as DeleteUserBody;

        const user = await User.findById(id);
        if (!user) {
            res.status(404).json({
                success: false,
                message: "User Not found"
            });
            return;
        }
        const matchPassword = await bcrypt.compare(password, user.password);

        if (!matchPassword) {
            res.status(401).json({
                success: false,
                message: "Invalid Password"
            });
            return;
        }

        await User.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "User Deleted Successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: ["Internal Server Error", error instanceof Error ? error.message : "Unknown Error"]
        });
    }
}