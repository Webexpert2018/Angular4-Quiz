import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Items } from './model/items';
import { NgForm } from '@angular/forms';
import { ItemService } from './item.service';

@Component({
    selector: 'app-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss'],
    providers: [ItemService]
})


export class ItemComponent implements OnInit {
    loading = false;
    model: Items;
    items: Items[] = [];
    SelectedIDs:any[]=[];
    constructor(private itemService: ItemService,
        private router: Router) {
        this.model = new Items();
    }
    selectID(id, event:any){
        debugger;
        this.SelectedIDs.push(id);
    }
    ngOnInit(): void {
        this.model.ItemID = 0;
        this.getItems();
    }
    addItem() {
        this.itemService.addItem(this.model)
            .subscribe(
            data => {
                window.location.reload();
            },
            error => {
                this.loading = false;
            });
    }
    getItems(){
        this.itemService.getItems()
      .then(items => {
          debugger;
          if(items!="not found")
          {
        this.items = items;
          }
          else{
            this.items = [];
          }
      });
    }
    getItem(itemId){
        this.itemService.getItem(itemId)
      .then(item => {
          debugger;
        this.model = item;
      }
    );
    }
    onEdit(itemId){
        this.getItem(itemId);
    }
    onDelete(itemId){
        this.itemService.deleteItem(itemId)
      .then(response => {          
        if(this.getItems()==null)
        {
            console.log("no dta");
        };
      });
    }
    deleteSelected(){   
        if(this.SelectedIDs.length>0)
        { 
        this.itemService.mutideleteItem(this.SelectedIDs)
        .then(response => {           
          this.getItems();
        });
    }
    else{
        alert("Please select value to delete");
    }
    };
    
   
}