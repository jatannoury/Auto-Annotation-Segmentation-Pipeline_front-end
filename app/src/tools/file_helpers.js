function buildTree(files) {
  const root = {};

  files.forEach((element) => {
    let paths = element.webkitRelativePath.split("/");
    paths.forEach((path, index) => {
      let currentNode = root;

      for (let i = 0; i < paths.length; i++) {
        const folderOrFile = paths[i];
        if (i === paths.length - 1) {
          currentNode[folderOrFile] = element;
        }
        if (!currentNode[folderOrFile]) {
          currentNode[folderOrFile] = {};
        }

        currentNode = currentNode[folderOrFile];
      }
    });
  });
  let root_dirs = Object.keys(root);
  if (root_dirs.length > 1) {
    throw "More than 1 root dir!";
  }
  return root[root_dirs[0]];
}
function isDirectory(str) {
  return (
    !str.endsWith(".png") && !str.endsWith(".jpg") && !str.endsWith(".avif")
  );
}
function file_dir_sort(a, b) {
  if (isDirectory(a) && !isDirectory(b)) {
    return -1; // a comes before b
  } else if (!isDirectory(a) && isDirectory(b)) {
    return 1; // b comes before a
  } else {
    return a.localeCompare(b); // maintain original order if both are directories or both are images
  }
}

module.exports = {
  buildTree,
  file_dir_sort,
  isDirectory,
};
