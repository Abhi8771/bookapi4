import express from 'express'
import bcrypt from 'bcrypt'
import { Admin } from './models/Admin.js'
import './db.js'

async function AdminAccount(){
    try {
        const adminCount = await Admin.countDocuments();
        if (adminCount === 0) {
            const hashPassword = await bcrypt.hash('adminpassword', 10);
            // You may want to create the admin here
            const newAdmin = new Admin({
                username: 'admin',
                password: hashPassword
            });
            await newAdmin.save();
            console.log("account created");
        } else {
            console.log("account already existed");
        }
    } catch(err) {
        console.error("Error seeding admin account:", err);
    }
}

AdminAccount()