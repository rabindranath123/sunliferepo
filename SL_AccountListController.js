({
    doInit : function(component, event, helper) {
        component.set('v.columns', [
           
            {label: 'Account Name', fieldName: 'linkName', type: 'url',sortable : true,editable: true,typeAttributes: {label: { fieldName: 'Name' }, target: '_blank',tooltip: { fieldName: 'Name' }}},
            {label: 'Account Owner', fieldName: 'OwnerName', type: 'url',sortable : true,editable: true,typeAttributes: {label: { fieldName: 'OwnerName' }, target: '_blank',tooltip: { fieldName: 'OwnerName' }}},
            {label: 'Phone', fieldName: 'Phone',  type: 'Phone',editable: true},
            {label: 'Website', fieldName: 'Website',  type: 'url',editable: true},
            {label: 'Annual revenue', fieldName: 'AnnualRevenue', type: 'currency',editable: true},
        ]);
    helper.onLoadAcc(component, event, helper);
    },
	
    handleSort : function(component,event,helper){
        var sortBy = event.getParam("fieldName");
        var sortDirection = event.getParam("sortDirection");
        component.set("v.sortBy",sortBy);
        component.set("v.sortDirection",sortDirection);
        helper.sortData(component,sortBy,sortDirection);
    },

     onSearchPhrase: function(component, event, helper) {
       	var allRecords = component.get("v.data");
        var searchFilter = event.getSource().get("v.value").toUpperCase();
            console.log("Searching"+searchFilter);
 	    var tempArray = [];
        var i;
      	for(i=0; i < allRecords.length; i++){
           if(allRecords[i].Name && allRecords[i].Name.toUpperCase().indexOf(searchFilter) != -1)
                {
                    tempArray.push(allRecords[i]);
                }
             	component.set("v.filteredData",tempArray);
            }
       },
     onSave : function( component, event, helper ) {   
     var updatedRecords = component.find( "acctList" ).get( "v.draftValues" );  
     var action = component.get( "c.accUpdate" );  
        action.setParams({  
        'accList' : updatedRecords  
    });  
    action.setCallback( this, function( response ) {  
     var state = response.getState();   
        if ( state === "SUCCESS" ) {  
         if ( response.getReturnValue() === true ) {  
            helper.toastMsg( 'success', 'Records Saved Successfully.' );  
            //$A.get('e.force:refreshView').fire();
            component.find( "acctList" ).set( "v.draftValues", null );  
         } else {   
                   helper.toastMsg( 'error', 'Something went wrong. Contact your system administrator.' );  
             
         }  
        }
    });  
        $A.enqueueAction( action );  
    },
})