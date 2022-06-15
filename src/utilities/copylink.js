export const copyToClipboard = (video, setOpenDialogue) => {
  navigator.clipboard
    .writeText(`${window.location.origin}/watch/${video._id}`)
    .then(
      function () {
        alert("copied successfully!");
        setOpenDialogue(false);
      },
      function (err) {
        alert("Failed to copy");
      }
    );
};
