import { sorting_types } from "../mainpage/mainpage_components/mainpage_utils"

export function filterTableContent(content, filters, applyFilters){
    if (content == []) return content
    if(!applyFilters) return content
    let newContent = [...content]
    for (let filter of filters){
        newContent = newContent.filter(item => {
            let parseValue
            for (let parser of filter.parsers){
                if (!parseValue) parseValue = item?.[parser]
                else parseValue = parseValue?.[parser]
            }
            return filter.name.includes(parseValue)
        })
    }
    return newContent
}


export function sortTableContent(filteredcontent, sort, applySorting){
    if (filteredcontent == []) return filteredcontent
    if(!applySorting){
        return filteredcontent
    } 
    let sortedContent = [...filteredcontent]
    sortedContent = sortedContent.sort(
        (a, b)=> 
        {
            return new Date(a?.[sort.sortingField]) - new Date(b?.[sort.sortingField])
        }
    )
    if (sort.type == sorting_types.ASCENDING) sortedContent.reverse() 
    return sortedContent
}

