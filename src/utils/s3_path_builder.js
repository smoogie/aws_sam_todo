exports.bucket = process.env.S3_PUBLIC_DATA;
exports.buildItemId = (itemType, itemId, ext, type="origin") => {
    return `${itemType}/${itemId}/${type}_${Date.now()}.${ext}`;
};
exports.buildUrl = (itemPath) => {
    return `https://s3.${process.env.DEPLOYMENT_REGION}.amazonaws.com/${process.env.S3_PUBLIC_DATA}/${itemPath}`
};