// // const makeid = (length) => {
// //   var result = "";
// //   var characters = "0123456789abcdefghijklmnopqrstuvwxyz";
// //   var charactersLength = characters.length;
// //   for (var i = 0; i < length; i++) {
// //     result += characters.charAt(Math.floor(Math.random() * charactersLength));
// //   }
// //   return result;a
// // };
// function slugify(str) {
//   ``;
//   str = str.replace(/^\s+|\s+$/g, "");
//   // Make the string lowercase
//   str = str.toLowerCase();
//   // Remove accents, swap ñ for n, etc
//   var from =
//     "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;";
//   var to =
//     "AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------";
//   for (var i = 0, l = from.length; i < l; i++) {
//     str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
//   }
//   // Remove invalid chars
//   str = str
//     .replace(/[^a-z0-9 -]/g, "")
//     // Collapse whitespace and replace by -
//     .replace(/\s+/g, "_")
//     // Collapse dashes
//     .replace(/-+/g, "_");
//   return str;
// }
// let res = [
//   "Rescue service",
//   "Helpline",
//   "Last news",
//   "All news",
//   "Electronic library",
//   "General statistics",
//   "Departament",
//   "Directions",
//   "Teachers",
//   "Interactive services",
//   "Online -lobby",
//   "To read payments",
//   "To the management appeal",
//   "Photo and video clips",
//   "Subscribe to news",
//   "Enter your email ...",
//   "Send",
//   "Useful links",
// ];
// res = res.map((item) => {
//   return slugify(item);
// });
// console.log(
//   slugify(
//     "At the Academy of the Ministry of Emergency Situations Civil Protection Institute"
//   )
// );
