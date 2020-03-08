export const sumInListInEachField = (config, list): any => {
  let sumResultList = {};
  config.forEach(configItem => {
    sumResultList = {
      ...sumResultList,
      [configItem.field]: 0
    };
  });
  list.forEach(({ id, ...data }) => {
    Object.keys(sumResultList).forEach(key => {
      if (data[key]) {
        sumResultList[key] = sumResultList[key] + Number(data[key]);
      }
    });
  });
  return sumResultList;
};

export const mulInListInEachField = (config, list): any => {
  let mulResultList = {};
  config.forEach(configItem => {
    mulResultList = {
      ...mulResultList,
      [configItem.field]: 1
    };
  });
  list.forEach(({ id, ...data }) => {
    Object.keys(mulResultList).forEach(key => {
      if (data[key]) {
        mulResultList[key] = mulResultList[key] * Number(data[key]);
      }
    });
  });
  return mulResultList;
};
