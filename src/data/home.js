const KenticoContent = require('@kentico/kontent-delivery');
const version = require('../../package.json').version;

const HOME_ITEM_CODENAME = "home"
const sourceTrackingHeaderName = 'X-KC-SOURCE'

const deliveryClient = new KenticoContent.DeliveryClient({
    projectId: 'e7bde8f4-0bd9-0013-c0f6-0b46c4a768c4',
    globalHeaders: (_queryConfig) => [
      {
        header: sourceTrackingHeaderName,
        value: `eleventastic-kontent;${version}`,
      },
    ],
  });


async function getHomeItem() {
  return deliveryClient.item(HOME_ITEM_CODENAME)
    .toPromise()
    .then(response => {
      const homeItemFormatted =  {  
          title: response.item.title.value,
          content: response.item.content.value,
        };
      return homeItemFormatted;
    });
}

module.exports = async () => {
  const homeItem = await getHomeItem();
  return homeItem;
};