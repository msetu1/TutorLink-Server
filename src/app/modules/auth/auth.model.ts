import mongoose, { Schema, model } from 'mongoose';
import { TRegisterStudent, UserModel } from './auth.interface';
import config from '../../config';
import bcrypt from 'bcrypt';
// Schema definition for User
const userRegisterSchema = new Schema<TRegisterStudent>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: 0 },
    role: { type: String, enum: ['tutor', 'student'] },
    isDeactivate: { type: Boolean, default: false },
    image: { type: String, required: true },
    thana: { type: String },
    district: { type: String },
    selectedThanas: {
      type: [String],
    },
  },
  {
    timestamps: true,
  },
);
userRegisterSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  // hashing password and save into DB

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});

userRegisterSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userRegisterSchema.pre('save', function (next) {
  if (this.selectedThanas?.length === 0) {
    this.selectedThanas = undefined; // ✅ Removes field when empty
  }
  next();
});
userRegisterSchema.statics.isUserExistsEmail = async function (email: string) {
  return await UserRegister.findOne({ email }).select('+password');
};

userRegisterSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

// Create and export the User model
export const UserRegister = model<TRegisterStudent, UserModel>(
  'Users',
  userRegisterSchema,
);

export const TutorRegister = mongoose.model<TRegisterStudent>(
  'Tutor',
  userRegisterSchema,
);
