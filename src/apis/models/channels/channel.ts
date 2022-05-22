import mongoose from 'mongoose';
import channelTypes from '../../consts/channelTypes';

const channelSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            minLength: [3, 'Channel name must be at least 3 characters'],
            maxLength: [100, 'Channel name must be at most 50 characters'],
        },
        topic: {
            type: String,
            minLength: [0, 'Channel topic must be at least 0 characters'],
            maxLength: [1024, 'Channel topic must be at most 1024 characters'],
        },
        tags: {
            type: [String],
            minLength: [0, 'Channel tags must be at least 0 characters'],
            maxLength: [1024, 'Channel tags must be at most 1024 characters'],
        },
        nsfw: {
            type: Boolean,
            default: false,
        },
        lastMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message',
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        parent: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Channel',
        },
        type: {
            type: String,
            enum: channelTypes,
        },
        server: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Server',
        },
        position: {
            type: Number,
            default: 0,
        },
        icon: {
            type: String,
            default: '',
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    },
);
