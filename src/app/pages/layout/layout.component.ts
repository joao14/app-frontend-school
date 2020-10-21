import { Router } from "@angular/router";
import { MenuService } from "./../../../services/app.menu.service";
import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: "app-layout",
    templateUrl: "./layout.component.html",
    styleUrls: ["./layout.component.css"],
    providers: [TranslateService],
})
export class LayoutComponent implements OnInit {
    menuMode = "static";

    topbarMenuActive: boolean;

    overlayMenuActive: boolean;

    staticMenuDesktopInactive: boolean;

    staticMenuMobileActive: boolean;

    lightMenu = false;

    menuClick: boolean;

    topbarItemClick: boolean;

    activeTopbarItem: any;

    menuHoverActive: boolean;

    rightPanelActive: boolean;

    rightPanelClick: boolean;

    constructor(
        private menuService: MenuService,
        private router: Router,
        private translate: TranslateService
    ) { }

    ngOnInit(): void {
    }

    onLayoutClick() {
        if (!this.topbarItemClick) {
            this.activeTopbarItem = null;
            this.topbarMenuActive = false;
        }

        if (!this.rightPanelClick) {
            this.rightPanelActive = false;
        }

        if (!this.menuClick) {
            if (this.isHorizontal() || this.isSlim()) {
                this.menuService.reset();
            }

            if (this.overlayMenuActive || this.staticMenuMobileActive) {
                this.hideOverlayMenu();
            }

            this.menuHoverActive = false;
        }

        this.topbarItemClick = false;
        this.menuClick = false;
        this.rightPanelClick = false;
    }

    onMenuButtonClick(event) {
        this.menuClick = true;
        this.topbarMenuActive = false;

        if (this.isOverlay()) {
            this.overlayMenuActive = !this.overlayMenuActive;
        }
        if (this.isDesktop()) {
            this.staticMenuDesktopInactive = !this.staticMenuDesktopInactive;
        } else {
            this.staticMenuMobileActive = !this.staticMenuMobileActive;
        }

        event.preventDefault();
    }

    onMenuClick($event) {
        this.menuClick = true;
    }

    onTopbarMenuButtonClick(event) {
        this.topbarItemClick = true;
        this.topbarMenuActive = !this.topbarMenuActive;

        this.hideOverlayMenu();

        event.preventDefault();
    }

    onTopbarItemClickLanguajes(event, item) {        
        this.topbarItemClick = true;
        if (this.activeTopbarItem === item) {
            this.activeTopbarItem = null;
        } else {
            this.activeTopbarItem = item;
        }
        event.preventDefault();
    }

    onTopbarItemClick(event, item) {
        this.topbarItemClick = true;

        if (this.activeTopbarItem === item) {
            this.activeTopbarItem = null;
        } else {
            this.activeTopbarItem = item;
        }

        event.preventDefault();
        this.router.navigate(["miperfil"]);
    }

    singout() {
        localStorage.clear();
        this.router.navigate(["/"]);
    }

    onTopbarSubItemClick(event) {
        event.preventDefault();
    }

    onTopbarSubItemClickLanguajes(event) {
        console.log('Validar lenguaje..');
        console.log(event.target.text);        
        let languajes = "";
        if (event.target.text == "Español") {
            languajes = "es";
        } else if (event.target.text == "English") {
            languajes = "en";
        } else {
            languajes = "ch";
        }

        this.translate.use(languajes);
        event.preventDefault();
    }

    onRightPanelButtonClick(event) {
        this.rightPanelClick = true;
        this.rightPanelActive = !this.rightPanelActive;
        event.preventDefault();
    }

    onRightPanelClick() {
        this.rightPanelClick = true;
    }

    isHorizontal() {
        return this.menuMode === "horizontal";
    }

    isSlim() {
        return this.menuMode === "slim";
    }

    isOverlay() {
        return this.menuMode === "overlay";
    }

    isStatic() {
        return this.menuMode === "static";
    }

    isMobile() {
        return window.innerWidth < 1025;
    }

    isDesktop() {
        return window.innerWidth > 1024;
    }

    isTablet() {
        const width = window.innerWidth;
        return width <= 1024 && width > 640;
    }

    hideOverlayMenu() {
        this.overlayMenuActive = false;
        this.staticMenuMobileActive = false;
    }
}
