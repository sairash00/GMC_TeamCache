import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },

        description: {
            type: String,
            required: true,
            trim: true,
            maxlength: 1000,
        },

        thumbnail: {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        },

        video: {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        },

        category: {
            type: String,
            required: true,
            enum: [
                "Financial Literacy",
                "Digital Literacy",
                "Agriculture",
                "Health",
                "Business",
                "Technology",
                "Vocational",
                "Communication",
                "Creative",
                "Other",
            ],
        },
        isPremium: {
            type: Boolean,
            default: false,
        },

        creditsRequired: {
            type: Number,
            default: 0,
            min: 0,
        },

        uploadedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        views: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const Video = mongoose.model("Video", videoSchema);

export default Video;