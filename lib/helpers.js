export const formatMetricName = (label) => {
    switch(label) {
        case 'CUMULATIVE_LAYOUT_SHIFT_SCORE':
            return ['Cumulative Layout Shift', 'CLS'];
        case 'EXPERIMENTAL_INTERACTION_TO_NEXT_PAINT':
            return ['Interaction To Next Paint', 'INP'];
        case 'EXPERIMENTAL_TIME_TO_FIRST_BYTE':
            return ['Time to First Byte', 'TTFB'];
        case 'FIRST_CONTENTFUL_PAINT_MS':
            return ['First Contentful Paint', 'FCP'];
        case 'FIRST_INPUT_DELAY_MS':
            return ['First Input Delay', 'FID'];
        case 'LARGEST_CONTENTFUL_PAINT_MS':
            return ['Largest Contentful Paint', 'LCP'];
            default:
                return ['no-match', 'NM'];
    };
}

export const formatMetricValue = (value) => {
    return parseFloat(value / 1000).toFixed(1);
}

export const getBorderColor = (index) => {
    switch(index) {
        case 0:
            return 'rgb(239 68 68)';
        case 1:
            return 'rgb(249 115 22)';
        case 2:
            return 'rgb(132 204 22)';
        case 3:
            return 'rgb(6 182 212)';
        case 4:
            return 'rgb(168 85 247)';
        case 5:
            return 'rgb(100 116 139)';
        case 6:
            return 'rgb(245 158 11)';
        case 7:
            return 'rgb(34 197 94)';
        default:
            return '#000000';
    }
}

export const getBackgroundColor = (index) => {
    switch(index) {
        case 0:
            return 'rgba(239, 68, 68, 0.4)';
        case 1:
            return 'rgba(249, 115, 22, 0.4)';
        case 2:
            return 'rgba(132, 204, 22, 0.4)';
        case 3:
            return 'rgba(6, 182, 212, 0.4)';
        case 4:
            return 'rgba(168, 85, 247, 0.4)';
        case 5:
            return 'rgba(100, 116, 139, 0.4)';
        case 6:
            return 'rgba(245, 158, 11, 0.4)';
        case 7:
            return 'rgba(34, 197, 94 0.4)';
        default:
            return '#000000';
    }
}

export const formatNumberValues = (metric, percentile) => {
    switch (metric) {
        case 'LCP':
        case 'FCP':
        case 'TTFB':
            return formatMetricValue(percentile)
        case 'CLS':
            return Number(percentile / 100);
        case 'INP':
            return typeof percentile !== 'undefined' ? parseFloat(percentile) : 'N/A';
        case 'FID':
            return typeof percentile !== 'undefined' ? parseFloat(percentile) : 'N/A';
       
    }
}

export const formatWebVitalValues = (metric, percentile) => {

    switch(metric) {
        case 'LCP':
            return `${formatMetricValue(percentile)}s`;
        case 'FCP':
            return `${formatMetricValue(percentile)}s`;
        case 'TTFB':
            return `${formatMetricValue(percentile)}s`;
        case 'INP':
            return typeof percentile !== 'undefined' ? `${percentile?.toLocaleString()}ms` : 'N/A';
        case 'FID':
            return typeof percentile !== 'undefined' ? `${percentile}ms` : 'N/A';
        case 'CLS':
            return `${percentile / 100}`;
    }
}

export const formatProjectName = (name) => {
    const firstLetter = name.charAt(0).toUpperCase();
    const restOfName = name.slice(1);
    return firstLetter + restOfName;
}