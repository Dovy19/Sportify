
import { Schema, model, models } from 'mongoose';

const graphicSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Graphic = models.Graphic || model('Graphic', graphicSchema);

export default Graphic;
