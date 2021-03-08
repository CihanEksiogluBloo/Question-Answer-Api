const searchHelper = (searchKey,query,req) => {
    //Search

    if(req.query.search){
        const searchObject = {};
        //title Search Value
        const regex = new RegExp(req.query.search,"i");

        searchObject[searchKey] = regex;

        return query = query.where(searchObject);

    }
    return query;
};
const populateHelper = (query,population) =>{
    return query.populate(population);
}
const questionSortHelper = (query,req) =>{
    const sortKey = req.query.sortBy;
    if ( sortKey === "most-answered"){
        return query.sort("-answerCount");

    }
    if ( sortKey === "most-liked"){
        return query.sort("-likeCount");

    }
    
       return query.sort("-createdAt -createdAt");

}
const paginationHelper = async(totalDocuments,query,req) => {
    const page = parseInt( req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const startIndex = (page -1) * limit;
    const endIndex = page * limit;

    const pagination = {};
    const total = totalDocuments;
    if (startIndex > 0) {
        // İf you are on first page
        pagination.previous = {
            page : page -1,
            limit : limit
        }
    }
    

    if (endIndex < total){
        //If you are not on the last page
        pagination.next = {
            page : page + 1,
            limit : limit
        }
    }

    return {
      query : query === undefined ? undefined : query.skip(startIndex).limit(limit),
      pagination : pagination,
      startIndex,
      limit
    };
}
module.exports = {
    searchHelper,
    populateHelper,
    questionSortHelper,
    paginationHelper
};
