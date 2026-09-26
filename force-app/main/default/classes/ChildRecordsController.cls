public with sharing class ChildRecordsController {

    @AuraEnabled(cacheable=true)
    public static List<sObject> getRelatedRecords(Id recordId, String childObjectApiName, String fieldsList, String lookupFieldApiName, Integer limitSize) {

        String soql = 'SELECT ' 
        + fieldsList +
        ' FROM ' + 
        childObjectApiName + 
        ' WHERE ' + 
        lookupFieldApiName + 
        ' = :recordId' + 
        ' LIMIT ' + limitSize;
        

        return Database.query(soql);
    }   
}