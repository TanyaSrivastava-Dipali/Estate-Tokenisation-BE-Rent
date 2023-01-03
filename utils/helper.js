const filterObj = (originalObj, ...allowedFields) => {
  const modifiedObj = {};
  Object.keys(originalObj).forEach((el) => {
    if (allowedFields.includes(el)) {
      modifiedObj[el] = originalObj[el];
    }
  });

  return modifiedObj;
};

export { filterObj };
