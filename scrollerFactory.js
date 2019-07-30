



function scrollerFactory(headerId, tableId, mainHeaderId) {
	window.scrollTo(0, 0);
    this.isSticky = null;
    this.header = document.querySelectorAll("#" + headerId)[0];
    this.table = document.querySelectorAll("#" + tableId)[0];
    this.headerTR = mainHeaderId ? document.querySelectorAll("#" + mainHeaderId)[0] : this.table.querySelectorAll("thead tr:first-child");
    this.stickyFrontier = this.header.getBoundingClientRect().top + window.scrollY;

    this.managerTableScroll = function (instructions) {
		let override = false;
		if(instructions && instructions.override){
			override = instructions.override;
		}
        if (window.pageYOffset > this.stickyFrontier - 20) {
                if (!this.isSticky || override) {
                    this.header.classList.add("sticky");
					this.table.querySelectorAll("tbody")[0].style.display = "block";
                    this.freezeHeaders(true);
                    this.isSticky = true;
                }
                let scrollH = -window.pageXOffset + "px";
				this.header.style.marginLeft = scrollH;
				this.header.style.display = "block";
				this.header.style.width = "120%";

        } else {
           // if (this.header.classList.contains("sticky")) {
                this.isSticky = false;
				this.header.classList.remove("sticky");
                this.table.querySelectorAll("tbody")[0].removeAttribute("style");
                this.header.removeAttribute("style");
           // }
        }
    }

    this.freezeHeaders = function () {
        let count = 0;

        let arrWidthsForTHs = [];
        let arrWidthsForTDs = [];
        let mainWidth = this.table.parentNode.offsetWidth - 20;
		let $dataTR = this.table.querySelectorAll("tbody tr:first-child")[0];
       // let $dataTR = $(this.table).find("tbody tr:first");
        if ($dataTR != undefined) {
            $dataTR.querySelectorAll("td").forEach(function (x,i) {
                    let w = x.offsetWidth;
                    arrWidthsForTHs.push(w);
                    count += w;
            });
            let ratios = [];
            arrWidthsForTHs.forEach(function (x, i) {
                ratios.push(x / count);
            });
            let off = -1;
			console.log(this.headerTR);
            this.headerTR[0].querySelectorAll("th").forEach(function (x,i) {
                if (!x.classList.contains("hide")) {
                    off++;
                    x.style.width =  parseInt((ratios[off] * mainWidth)) + ".px";
                    x.style.minWidth  = arrWidthsForTHs[off];
                    let w = x.offsetWidth;
                    arrWidthsForTDs.push(w);
                }
            });
            $dataTR.querySelectorAll("td").forEach(function (x,i) {
                   x.style.minWidth = arrWidthsForTDs[i] + ".px";
            });
        }
    }
}