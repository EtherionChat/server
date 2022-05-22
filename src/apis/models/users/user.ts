import { Document, Model, model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';

const SALT_WORK_FACTOR = 10;
const MIN_LENGTH_PASSWORD = 8;
const MIN_LENGTH_DISCRIMINATOR = 5;
const MAX_LENGTH_DISCRIMINATOR = 5;

/**
 * Interface to model the User Schema for TypeScript.
 * @param email:string
 * @param password:string
 * @param avatar:string
 */
export interface IUser extends Document {
    email: string;
    password: string;
    avatar: string;
    salt: string;
}

const userSchema: Schema = new Schema(
    {
        username: {
            type: String,
        },
        email: {
            type: Object,
            properties: {
                address: {
                    type: String,
                    required: [true, 'Email is required'],
                    unique: [true, 'Email is already in use'],
                    validate: [validator.isEmail, 'Invalid email format'],
                },
                verified: {
                    type: Boolean,
                    default: false,
                    required: false,
                    validate: [validator.isBoolean, 'Invalid verified format'],
                },
                verifiedAt: {
                    type: Date,
                    default: null,
                    required: false,
                    validate: [validator.isDate, 'Invalid verifiedAt format'],
                },
            },
            required: [true, 'Email is required'],
            additionalProperties: [false, 'Cannot have additional properties'],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minLength: [MIN_LENGTH_PASSWORD, `Password must be at least ${MIN_LENGTH_PASSWORD} characters`],
            validate: [validator.isStrongPassword, 'Password must be strong'],
        },
        salt: {
            type: String,
            required: [true, 'Salt is required'],
        },
        discriminator: {
            type: String,
            required: [true, 'Discriminator is required'],
            minLength: [
                MIN_LENGTH_DISCRIMINATOR,
                `Discriminator must be at least ${MIN_LENGTH_DISCRIMINATOR} characters`,
            ],
            maxLength: [
                MAX_LENGTH_DISCRIMINATOR,
                `Discriminator must be at most ${MAX_LENGTH_DISCRIMINATOR} characters`,
            ],
        },
        accentColor: {
            type: String,
            required: [true, 'AccentColor is required'],
            minLength: [
                MIN_LENGTH_DISCRIMINATOR,
                `AccentColor must be at least ${MIN_LENGTH_DISCRIMINATOR} characters`,
            ],
            maxLength: [MAX_LENGTH_DISCRIMINATOR, `AccentColor must be at most ${MAX_LENGTH_DISCRIMINATOR} characters`],
        },
        avatar: {
            type: String,
            validate: [validator.isURL, 'Invalid avatar url format'],
        },
        phoneNumber: {
            type: String,
            validate: [validator.isMobilePhone, 'Invalid phone number format'],
        },
        birthday: {
            type: Date,
            validate: [validator.isISO8601, 'Invalid birthday format'],
        },
        location: {
            type: Object,
            properties: {
                address: {
                    type: String,
                    required: [true, 'Location is required'],
                    validate: [validator.isLength, 'Invalid location format'],
                },
                coordinates: {
                    type: Array,
                    required: [true, 'Location is required'],
                    validate: [validator.isLength, 'Invalid location format'],
                },
            },
            required: [true, 'Location is required'],
            additionalProperties: [false, 'Cannot have additional properties'],
        },
        locale: {
            type: String,
            validate: [validator.isLocale, 'Invalid locale format'],
            default: 'en-US',
        },
        timezone: {
            type: String,
            validate: [validator.isTimezone, 'Invalid timezone format'],
            default: 'UTC',
        },
        timeFormat: {
            type: Number,
            enum: [12, 24],
            default: 12,
        },
        offDays: {
            type: Array,
            default: [],
            validate: [validator.isArray, 'Invalid offDays format'],
            items: {
                type: String,
                validate: [validator.isDayOfWeek, 'Invalid offDays format'],
            },
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    },
);

userSchema.plugin(paginate);
userSchema.plugin(toJSON);

userSchema.virtual('id').get(function (this: IUser) {
    return this._id.toString();
});

userSchema.virtual('avatar_url').get(function (this: IUser) {
    return `${process.env.APP_URL}/api/users/${this.id}/avatar`;
});

userSchema.methods.verifyPassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

userSchema.pre('save', async function (this: IUser, next) {
    const user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
                return next(err);
            }
            //   user.discriminator = "12";
            user.salt = salt;
            user.password = hash;
            next();
        });
    });
});

const User: Model<IUser> = model('User', userSchema);

export default User;
