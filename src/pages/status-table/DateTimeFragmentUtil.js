export default {
    getDates(startDate, endDate, diffFlag) {
        var dates = [];
        var timeDiff = 1000*60*60;
        var targetStartDate = startDate;
        if(diffFlag === '15分') {
            timeDiff = 1000*60*15;
            targetStartDate = new Date(startDate.getFullYear(), startDate.getMonth(),
                startDate.getDate(), startDate.getHours(), 0, 0);
        }
        if(diffFlag === '时') {
            timeDiff = 1000*60*60;
            targetStartDate = new Date(startDate.getFullYear(), startDate.getMonth(),
                startDate.getDate(), startDate.getHours(), 0, 0);
        }
        if(diffFlag === '日') {
            timeDiff = 1000*60*60*24;
            targetStartDate = new Date(startDate.getFullYear(), startDate.getMonth(),
                startDate.getDate(), 0, 0, 0);
        }
        if(diffFlag === '15分' || diffFlag === '时' || diffFlag === '日') {
            var targetDate = targetStartDate;
            while(true) {
                if(targetDate.getTime() > endDate.getTime()) {
                    break;
                }
                dates.push(targetDate);
                targetDate = new Date(targetDate.getTime() + timeDiff);
            }
        }

        if(diffFlag === '月') {
            var startYear = startDate.getFullYear();
            var startMonth = startDate.getMonth();
            var endYear = endDate.getFullYear();
            var endMonth = endDate.getMonth();
            for(var i=startYear; i<=endYear; i++) {
                var minMonth = 0;
                var maxMonth = 12;
                if(i === startYear) {
                    minMonth = startMonth;
                }
                if(i === endYear) {
                    maxMonth = endMonth;
                }
                for(var j=minMonth; j<=maxMonth; j++) {
                    dates.push(new Date(i, j, 1, 0, 0, 0));
                }
            }
        }
        if(diffFlag === '年') {
            var startYear = startDate.getFullYear();
            var endYear = endDate.getFullYear();
            for(var i=startYear; i<=endYear; i++) {
                dates.push(new Date(i, 0, 1, 0, 0, 0));
            }
        }

        return dates;
    }
}