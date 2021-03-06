({
    onLoadAcc : function(component,event,helper) {
        var action = component.get("c.getAccounts");
        action.setCallback(this, function(resp) {
            if (resp.getState() == 'SUCCESS') {
                var rows = resp.getReturnValue();
                console.log("Account Values"+ JSON.stringify(rows));
                rows.forEach(function(record){
                    record['OwnerName'] = record.Owner.Name;
                });
                    rows.forEach(function(record){
                    record.linkName = '/'+record.Id;
                });
                component.set('v.data', rows );
                component.set('v.filteredData', rows );
            }
            
        }) ;    
        $A.enqueueAction(action);
    },
    sortData : function(component,fieldName,sortDirection){
        var data = component.get("v.data");
        //function to return the value stored in the field
        var key = function(a) { return a[fieldName]; }
        var reverse = sortDirection == 'asc' ? 1: -1;
        data.sort(function(a,b){ 
            var a = key(a) ? key(a).toLowerCase() : '';
            var b = key(b) ? key(b).toLowerCase() : '';
            return reverse * ((a>b) - (b>a));
        });    
        component.set("v.data",data);
    },
    toastMsg : function( strType, strMessage ) {  
      var showToast = $A.get( "e.force:showToast" );   
        showToast.setParams({   
            
            message : strMessage,  
            type : strType,  
            mode : 'sticky'  
            
        });   
        showToast.fire();   
        
    }  
})