import { Webhook } from "svix";
import User from "../models/User.js";

// API Controller Function to Manage Clerk User with database
export const clerkWebhooks = async (req, res) => {
    try {

        // Create a Svix instance with clerk webhook secret.
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        // When using express.raw(), req.body is a Buffer
        const payloadString = req.body.toString('utf8')

        // Verifying Headers
        await whook.verify(payloadString, {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        })

        // Getting Data from request body
        const { data, type } = JSON.parse(payloadString)

        // Switch Cases for differernt Events
        switch (type) {
            case 'user.created': {
                console.log("Received user.created event for ID:", data.id)
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    image: data.image_url,
                    resume: ''
                }
                await User.create(userData)
                console.log("User successfully created in MongoDB")
                res.json({})
                break;
            }

            case 'user.updated': {
                console.log("Received user.updated event for ID:", data.id)
                const userData = {
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    image: data.image_url,
                }
                await User.findByIdAndUpdate(data.id, userData)
                res.json({})
                break;
            }

            case 'user.deleted': {
                console.log("Received user.deleted event for ID:", data.id)
                await User.findByIdAndDelete(data.id)
                res.json({})
                break;
            }
            default:
                console.log("Received unhandled webhook event type:", type)
                res.json({})
                break;
        }

    } catch (error) {
        console.error("WEBHOOK ERROR:", error.message)
        res.json({ success: false, message: error.message })
    }
}