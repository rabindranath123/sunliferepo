/**
* @File Name:      SL_AccList
* @Description:    Controller for SL_AccountList lightning component
* @group:          Apex Class
* @Author:         Rabin
* @Modification Log  : 
______________________________________________________________________________________
* Ver       Date            Modification
* 1.0       2021-03-06       Created the file/classes
*/
public class SL_AccList {
    @AuraEnabled
    public static List<Account>  getAccounts(){
        List <Account> acc = [select id,Name,Owner.Name,Phone,Website,AnnualRevenue  from Account where Industry='Financial Services' limit 50];
        return acc;
    }
    @AuraEnabled    
    public static boolean accUpdate( List < Account > accList ) {    
        try {  
            update accList;  
            return true;  
            
        } catch(Exception e) {  
            return false;  
            
        }  
        
    }    
}