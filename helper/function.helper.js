module.exports = {

  uploadFile: async (file, key, path) => {
    let file_name = Date.now() + file[key].name.replace(/\s/g, '');
    file[key].mv(path + file_name, (err) => {
      if(err) {
        console.log("error", err);
        return false;
      }
      return true;
    })
  }
}