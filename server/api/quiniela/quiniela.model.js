'use strict';

import mongoose from 'mongoose';

var QuinielaSchema = new mongoose.Schema({
  name: String,
  info: String,
  public: Boolean,
  slug: String,
  admin: {
    email: String,
    name: String
  },
  users: [ {
      email: String,
      name: String,
      puntaje: Number
  }]

});

export default mongoose.model('Quiniela', QuinielaSchema);
