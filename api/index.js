const { WebClient } = require("@slack/web-api");
const axios = require("axios").default;
const images = {
  morning:
    "https://oldschool.runescape.wiki/images/thumb/Rune_armour_set_%28lg%29_equipped.png/260px-Rune_armour_set_%28lg%29_equipped.png?9b396",
  afternoon:
    "https://oldschool.runescape.wiki/images/thumb/Mithril_armour_set_%28lg%29_equipped.png/260px-Mithril_armour_set_%28lg%29_equipped.png?ae850",
  night:
    "https://oldschool.runescape.wiki/images/thumb/Bronze_armour_set_%28lg%29_equipped.png/260px-Bronze_armour_set_%28lg%29_equipped.png?47433",
};
async function setPFP() {
  var hour = new Date().getHours() + 10;
  let image;
  if (5 < hour && hour < 12) {
    image = await axios.get(images.morning, {
      responseType: "arraybuffer",
    });
  } else if (12 < hour && hour < 20) {
    image = await axios.get(images.afternoon, {
      responseType: "arraybuffer",
    });
  } else {
    image = await axios.get(images.night, {
      responseType: "arraybuffer",
    });
  }
  const client = new WebClient();
  const slackRequest = await client.users.setPhoto({
    image: image.data,
    token: process.env.SLACK_TOKEN,
  });
}
export default async (req, res) => {
  await setPFP();
  res.send("Started changing your PFP!");
};
