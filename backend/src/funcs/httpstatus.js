const statusList = {
    SUCCESSFUL: 200,
    CREATED: 201,
    NOT_FOUND: 404,
};

const mapStatus = (status) => statusList[status] || 500; 
module.exports = { mapStatus };