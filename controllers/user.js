const mongoose = require("mongoose");
const axios = require("axios");
const User = mongoose.model("users");

exports.get = async (req, res) => {
  const response = await User.find({});
  res.send(response);
};
exports.getOne = async (req, res) => {
  const response = await User.findById(req.params.id);
  res.send(response);
};
exports.post = async (req, res) => {
  const response = await new User(req.body).save();
  res.send(response);
};
exports.put = async (req, res) => {
  const response = await User.findByIdAndUpdate(req.params.id, req.body);
  res.send(response);
};
exports.delete = async (req, res) => {
  const response = await User.findByIdAndDelete(req.params.id);
  res.send(response);
};
exports.getPlaylists = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  if (user.spotifyId) {
    let data = await axios({
      method: "get",
      url: `https://api.spotify.com/v1/users/${user.spotifyId}/playlists`,
      headers: {
        Authorization: `Bearer ${user.spotifyAccess}`,
        "Content-Type": "application/json"
      }
    });
    data = data.data.items;
    let playlists = data.map(item => {
      return {
        url: item.external_urls.spotify,
        images: item.images,
        name: item.name,
        owner: item.owner.display_name,
        ownerUrl: item.owner.external_urls.spotify,
        numTracks: item.tracks.total
      };
    });
    res.send(playlists);
  }
};
exports.getRecentlyPlayed = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  if (user.spotifyId) {
    let data = await axios({
      method: "get",
      url: `https://api.spotify.com/v1/me/player/recently-played`,
      headers: {
        Authorization: `Bearer ${user.spotifyAccess}`,
        "Content-Type": "application/json"
      }
    });
    data = data.data.items;
    let recentlyPlayed = data.map(item => {
      return {
        album: item.track.album.name,
        title: item.track.name,
        artist: item.track.artists[0].name,
        preview: item.track.preview_url
      };
    });
    res.send(recentlyPlayed);
  }
};
