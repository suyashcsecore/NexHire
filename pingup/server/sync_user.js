import mongoose from 'mongoose';

(async () => {
    try {
        const clerkUserId = 'user_3HdKASlfpUmRHw3TxCop7gmuY5S';
        
        // Fetch user from Clerk
        const res = await fetch(`https://api.clerk.com/v1/users/${clerkUserId}`, {
            headers: {
                'Authorization': `Bearer ${process.env.CLERK_SECRET_KEY}`
            }
        });
        const user = await res.json();
        console.log("Clerk User:", user.id);

        await mongoose.connect(process.env.MONGODB_URI);
        const User = mongoose.model('User', new mongoose.Schema({ _id: String, email: String, full_name: String, username: String, bio: String, profile_picture: String, cover_photo: String, location: String, followers: [String], following: [String], connections: [String] }, {timestamps: true, minimize: false}));
        
        await User.findByIdAndUpdate(user.id, {
            _id: user.id,
            email: user.email_addresses[0].email_address,
            full_name: (user.first_name + ' ' + (user.last_name || '')).trim(),
            username: user.username || user.first_name + Math.floor(Math.random() * 1000),
            profile_picture: user.image_url
        }, { upsert: true });

        console.log('User synced!');
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
})();
