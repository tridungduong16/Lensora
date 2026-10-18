import { eyewearProducts } from "./eyewear-catalog";

type FrameMask = {
  image: string;
  referenceWidth: number;
  bounds: [number, number, number, number];
  /** Hand-traced front contours in reference-image coordinates. */
  outer: string;
  lenses: [string, string];
  eyeLine: number;
  tint?: string;
  keepHighlights?: boolean;
  rimColor?: string;
  noseCut?: string;
};

// The photograph supplies the actual rim texture. Masks remove the background,
// folded temples, lens labels and price tags; no generated product photographs.
export const tryOnFrames: Record<string, FrameMask> = {
  "velocity-gong-kim-loai": {
    image: "/images/collections/photo_2026-10-17_22-45-14.webp", referenceWidth: 900,
    bounds: [110, 703, 709, 255], eyeLine: 0.43, keepHighlights: true, rimColor: "#72746d",
    outer: "M112 789 L147 787 Q154 747 184 727 Q214 706 282 713 Q352 709 379 731 Q412 750 419 785 L425 774 Q464 762 503 774 L511 786 Q529 732 555 718 Q589 701 659 705 Q724 703 752 726 Q776 746 784 774 L815 774 L818 788 L785 793 Q783 874 752 912 Q724 947 659 948 Q588 953 554 921 Q516 885 508 807 Q462 788 421 807 Q418 884 384 921 Q352 956 282 956 Q220 954 196 928 Q152 888 146 805 L112 804 Z",
    lenses: [
      "M153 788 Q158 750 189 730 Q216 712 283 718 Q351 714 376 736 Q409 755 413 790 Q417 874 379 917 Q349 950 282 951 Q225 950 199 924 Q159 886 152 813 Z",
      "M518 786 Q535 736 559 722 Q593 706 660 710 Q722 708 748 731 Q773 751 779 782 Q781 869 747 909 Q721 941 659 943 Q590 947 558 916 Q521 882 514 807 Z",
    ],
  },
  "stance-gong-trong": {
    image: "/images/collections/photo_2026-10-17_22-45-39.webp", referenceWidth: 900,
    bounds: [123, 717, 630, 226], eyeLine: 0.43, keepHighlights: true, rimColor: "#85858a",
    outer: "M125 739 Q254 694 352 731 Q381 741 401 764 Q435 779 467 763 Q496 733 549 727 Q637 709 749 743 L751 765 Q735 775 730 799 Q718 893 682 921 Q657 941 597 943 Q534 942 508 919 Q478 895 463 811 Q456 789 433 792 Q409 794 402 819 Q384 892 349 917 Q316 941 258 940 Q200 940 177 917 Q146 883 140 806 Q138 779 124 766 Z",
    lenses: [
      "M163 761 Q171 740 220 731 Q293 716 350 741 Q386 753 393 778 Q398 804 383 850 Q370 889 343 909 Q314 930 259 930 Q208 930 185 909 Q161 880 155 810 Q152 777 163 761 Z",
      "M483 776 Q501 749 551 738 Q630 722 697 747 Q723 758 720 792 Q710 880 677 912 Q652 934 598 933 Q540 932 515 910 Q490 887 476 813 Q472 793 483 776 Z",
    ],
  },
  "face2face-gong-kim-loai": {
    image: "/images/collections/photo_2026-10-17_22-46-12.webp", referenceWidth: 900,
    bounds: [128, 770, 658, 210], eyeLine: 0.43, keepHighlights: true, rimColor: "#b29175",
    outer: "M131 824 Q142 821 160 824 Q168 790 216 779 Q271 762 323 779 Q396 794 407 833 Q448 821 491 835 Q503 796 554 786 Q621 772 676 786 Q744 798 750 837 L783 838 L785 849 L750 849 Q746 920 715 952 Q680 980 614 978 Q545 977 519 950 Q493 923 487 846 Q447 834 408 846 Q403 915 369 947 Q338 974 272 973 Q213 972 185 947 Q158 916 157 844 L132 842 Z",
    lenses: [
      "M164 834 Q171 795 219 783 Q271 768 322 783 Q392 798 402 835 Q400 911 365 943 Q335 968 273 968 Q216 967 189 943 Q163 914 163 850 Z",
      "M496 838 Q506 801 556 791 Q620 777 675 791 Q740 803 745 839 Q743 916 711 948 Q678 974 615 973 Q548 972 523 946 Q497 920 493 852 Z",
    ],
  },
  "bolon-gong-xam-trong": {
    image: "/images/collections/photo_2026-10-17_22-46-17.webp", referenceWidth: 900,
    bounds: [126, 722, 658, 235], eyeLine: 0.43, keepHighlights: true, rimColor: "#505354",
    outer: "M128 756 Q267 714 361 746 Q396 756 414 777 Q452 780 496 774 Q517 742 566 733 Q671 710 780 740 L782 775 Q756 783 751 813 Q747 892 714 922 Q690 946 615 943 Q549 945 523 917 Q500 892 488 805 Q450 790 421 806 Q414 887 389 920 Q365 954 278 956 Q204 956 178 929 Q154 905 148 826 Q145 801 127 794 Z",
    lenses: [
      "M178 782 Q184 758 236 750 Q300 738 357 758 Q392 769 402 794 Q411 827 395 879 Q384 915 362 930 Q337 946 279 946 Q214 947 190 922 Q169 899 165 830 Q162 800 178 782 Z",
      "M519 774 Q537 749 571 745 Q654 726 716 748 Q746 760 745 794 Q746 873 718 909 Q694 936 615 934 Q559 935 535 909 Q512 882 505 817 Q502 791 519 774 Z",
    ],
  },
  "exfash-kids": {
    image: "/images/collections/photo_2026-10-17_23-02-28.webp", referenceWidth: 900,
    bounds: [135, 849, 612, 151], eyeLine: 0.43, keepHighlights: true, rimColor: "#d696b8",
    outer: "M137 858 L166 852 Q282 841 392 880 Q432 895 480 882 Q599 843 709 851 L744 858 L745 896 Q724 903 716 933 Q700 976 661 987 Q582 1004 521 988 Q490 980 478 951 Q465 915 453 915 L419 915 Q407 955 390 974 Q364 997 284 997 Q210 996 185 975 Q169 958 155 917 L138 900 Z",
    lenses: [
      "M179 881 Q243 862 337 881 Q380 889 391 903 Q398 921 380 957 Q370 980 284 984 Q218 983 197 967 Q179 949 175 906 Q172 887 179 881 Z",
      "M497 903 Q551 874 663 869 Q704 866 703 888 Q700 947 677 962 Q649 984 574 985 Q526 985 510 971 Q492 953 487 921 Q484 909 497 903 Z",
    ],
  },
  "exfash-ef45402": {
    image: "/images/collections/photo_2026-10-17_23-10-18.webp", referenceWidth: 900,
    bounds: [153, 747, 582, 213], eyeLine: 0.43, keepHighlights: true, rimColor: "#bca2af",
    outer: "M155 790 L174 781 Q225 748 286 749 Q364 742 412 790 Q443 773 480 791 Q531 745 594 750 Q661 751 718 784 L733 797 L730 816 L714 821 Q707 909 655 939 Q623 957 580 957 Q527 957 500 929 Q475 904 467 825 Q441 801 423 825 Q414 897 387 926 Q350 958 294 958 Q236 957 207 930 Q184 910 178 824 L154 816 Z",
    lenses: [
      "M188 796 Q218 763 267 757 Q348 744 400 793 Q415 805 407 844 Q398 903 379 920 Q345 949 294 949 Q241 949 216 925 Q190 900 185 829 Q181 808 188 796 Z",
      "M493 806 Q530 761 592 758 Q654 758 691 789 Q707 806 703 841 Q698 905 651 931 Q622 948 582 948 Q535 948 510 922 Q487 894 479 831 Q478 816 493 806 Z",
    ],
  },
  "ziozia-gong-trong": {
    image: "/images/collections/photo_2026-10-17_23-10-36.webp", referenceWidth: 900,
    bounds: [113, 839, 648, 238], eyeLine: 0.42, keepHighlights: true, rimColor: "#aeb1bd",
    outer: "M116 869 L145 861 Q259 827 338 856 Q367 866 383 890 Q425 881 474 892 Q494 865 536 856 Q626 824 718 861 L759 875 L757 902 L732 911 Q725 1007 685 1044 Q651 1078 596 1073 Q529 1072 503 1042 Q473 1008 461 919 Q425 904 395 920 Q384 1008 352 1041 Q315 1068 250 1066 Q185 1064 157 1035 Q132 1005 130 916 L115 901 Z",
    lenses: [
      "M150 899 Q153 868 197 859 Q273 839 335 865 Q366 878 375 906 Q383 995 345 1032 Q310 1058 251 1057 Q191 1055 164 1028 Q141 1000 141 921 Z",
      "M488 901 Q510 870 544 863 Q622 839 701 869 Q726 880 725 911 Q722 1004 679 1036 Q651 1067 597 1063 Q537 1062 510 1035 Q483 1005 475 929 Q471 913 488 901 Z",
    ],
  },
  "stance-gong-tim-do": {
    image: "/images/collections/photo_2026-10-17_23-10-47.webp", referenceWidth: 900,
    bounds: [61, 763, 721, 202], eyeLine: 0.43, keepHighlights: true, rimColor: "#824276",
    outer: "M64 789 Q234 745 345 777 Q375 786 395 800 Q434 789 477 800 Q525 764 603 765 Q689 762 779 791 L780 818 Q751 822 748 847 Q736 921 709 942 Q680 963 601 962 Q534 963 510 941 Q485 920 472 838 Q467 818 439 819 Q411 818 404 839 Q388 921 359 943 Q332 963 248 963 Q175 964 143 942 Q111 925 104 849 Q102 826 64 819 Z",
    lenses: [
      "M125 806 Q208 766 315 779 Q366 787 389 812 Q397 839 378 884 Q366 923 346 936 Q325 953 249 954 Q181 953 153 933 Q126 911 117 848 Q115 820 125 806 Z",
      "M491 813 Q530 776 608 775 Q684 772 719 797 Q742 813 738 843 Q727 915 701 935 Q676 954 601 953 Q540 953 518 932 Q494 909 481 844 Q477 826 491 813 Z",
    ],
  },
  "exfash-gong-chuyen-mau": {
    image: "/images/collections/photo_2026-10-17_23-10-56.webp", referenceWidth: 900,
    bounds: [96, 862, 638, 201], eyeLine: 0.43, keepHighlights: true, rimColor: "#606b72",
    outer: "M98 899 Q178 865 243 867 Q326 862 363 891 L384 910 Q416 918 447 908 Q470 880 512 870 Q604 851 699 877 L730 890 L731 922 Q715 925 709 946 Q694 1026 659 1046 Q632 1060 581 1059 Q511 1060 481 1035 Q454 1008 442 946 Q436 927 415 929 Q394 928 387 948 Q372 1018 338 1042 Q312 1062 252 1061 Q190 1060 161 1037 Q129 1012 116 941 L98 930 Z",
    lenses: [
      "M139 911 Q151 888 205 880 Q284 866 339 890 Q369 903 373 928 Q374 985 344 1024 Q322 1050 253 1051 Q195 1050 168 1029 Q139 1005 129 949 Q124 924 139 911 Z",
      "M463 920 Q477 888 520 880 Q608 861 678 887 Q702 897 701 924 Q693 1008 653 1037 Q629 1050 582 1049 Q516 1050 489 1028 Q465 1005 453 949 Q450 932 463 920 Z",
    ],
  },
  "flyar-gong-trong": {
    image: "/images/collections/photo_2026-10-17_23-37-43.webp", referenceWidth: 900,
    bounds: [140, 817, 612, 205], eyeLine: 0.43, keepHighlights: true, rimColor: "#9f8d9c",
    outer: "M142 828 Q244 807 336 827 Q382 831 403 851 Q445 845 480 852 Q505 831 548 822 Q627 808 714 836 L750 846 L750 871 L732 881 Q725 969 689 994 Q656 1021 597 1019 Q532 1017 506 992 Q483 970 472 892 Q465 877 441 880 Q419 878 409 894 Q396 970 368 990 Q338 1007 281 1006 Q218 1004 193 984 Q166 959 160 872 L142 858 Z",
    lenses: [
      "M180 848 Q223 824 293 829 Q355 829 386 850 Q401 860 398 890 Q388 961 362 982 Q335 999 282 997 Q225 995 201 976 Q180 953 173 884 Q169 857 180 848 Z",
      "M493 864 Q515 835 562 829 Q630 816 695 844 Q720 855 719 883 Q712 964 682 987 Q651 1012 598 1010 Q539 1009 512 984 Q491 964 481 894 Q478 877 493 864 Z",
    ],
  },
  "new-balance-gong-tron": {
    image: "/images/collections/photo_2026-10-17_23-38-06.webp", referenceWidth: 900,
    bounds: [113, 722, 657, 236], eyeLine: 0.43, keepHighlights: true, rimColor: "#694b41",
    outer: "M115 802 L150 800 Q159 757 192 743 Q234 727 283 730 Q348 726 378 757 Q394 774 400 804 Q441 786 486 801 Q500 754 537 736 Q575 717 624 724 Q691 720 718 752 Q735 775 736 791 L767 790 L768 805 L737 808 Q741 872 712 912 Q678 949 608 948 Q546 950 517 919 Q484 881 483 814 Q443 797 402 816 Q407 885 375 922 Q344 957 272 957 Q216 955 186 925 Q150 886 147 818 L116 819 Z",
    lenses: [
      "M154 809 Q160 761 195 748 Q235 732 283 735 Q346 731 374 761 Q396 783 396 821 Q399 881 371 918 Q341 952 273 952 Q220 950 190 921 Q155 883 153 826 Z",
      "M491 808 Q505 758 540 741 Q577 722 625 729 Q687 725 714 756 Q735 780 731 816 Q734 869 708 908 Q675 944 608 943 Q550 945 521 915 Q489 879 488 825 Z",
    ],
  },
  "bolon-gong-vuong": {
    image: "/images/collections/photo_2026-10-17_22-45-46.webp", referenceWidth: 900,
    bounds: [66, 694, 718, 239], eyeLine: 0.43,
    outer: "M69 721 Q241 686 345 716 Q378 723 395 736 Q425 733 458 733 Q514 691 620 696 Q705 693 781 708 L780 764 Q756 773 751 800 Q739 881 711 905 Q684 928 581 922 Q520 920 496 895 Q470 869 453 805 Q448 784 425 786 Q410 785 402 809 Q382 884 356 907 Q328 934 221 929 Q150 929 127 906 Q109 888 100 835 Q94 790 71 778 Z",
    lenses: [
      "M128 747 Q223 719 330 738 Q371 746 381 770 Q389 796 372 842 Q359 887 334 902 Q307 918 221 917 Q160 916 142 898 Q121 873 117 826 Q111 769 128 747 Z",
      "M487 750 Q552 721 644 725 Q703 725 723 744 Q737 758 728 816 Q721 878 700 897 Q680 914 582 913 Q529 912 510 891 Q486 861 475 811 Q464 768 487 750 Z",
    ],
  },
  "new-balance-gong-kim-loai": {
    image: "/images/collections/photo_2026-10-17_23-37-56.webp", referenceWidth: 900,
    bounds: [102, 685, 712, 241], eyeLine: 0.42, keepHighlights: true,
    outer: "M103 744 L137 744 Q139 705 179 693 Q254 672 350 698 Q395 711 401 751 Q449 729 501 750 Q505 710 544 696 Q623 673 720 691 Q771 704 777 747 L813 748 L813 769 L776 768 Q771 851 740 888 Q707 927 625 924 Q546 924 520 897 Q494 869 497 808 L498 765 Q448 745 403 766 Q407 843 374 885 Q346 922 260 920 Q187 919 163 887 Q138 852 136 767 L103 765 Z",
    lenses: [
      "M144 748 Q147 710 184 699 Q254 681 348 703 Q390 715 396 753 Q404 836 369 881 Q341 916 261 915 Q192 914 169 883 Q144 848 143 791 Z",
      "M506 751 Q510 715 548 702 Q624 680 718 697 Q766 708 771 750 Q774 832 736 884 Q705 920 625 919 Q551 919 525 892 Q499 864 503 810 Z",
    ],
  },
};

export const tryOnProducts = eyewearProducts.filter((product) => tryOnFrames[product.slug]);

export async function prepareFrame(slug: string): Promise<HTMLCanvasElement> {
  const config = tryOnFrames[slug];
  if (!config) throw new Error("No calibrated try-on asset for this product");
  const photo = new Image();
  photo.src = config.image;
  await photo.decode();
  const [x, y, width, height] = config.bounds;
  const canvas = document.createElement("canvas");
  canvas.width = Math.ceil(width);
  canvas.height = Math.ceil(height);
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas unavailable");
  context.translate(-x, -y);
  context.save();
  context.clip(new Path2D(config.outer));
  const ratio = config.referenceWidth / photo.naturalWidth;
  context.drawImage(photo, 0, 0, config.referenceWidth, photo.naturalHeight * ratio);
  context.restore();
  context.globalCompositeOperation = "destination-out";
  config.lenses.forEach((path) => context.fill(new Path2D(path)));
  if (config.noseCut) context.fill(new Path2D(config.noseCut));
  context.globalCompositeOperation = "source-over";
  if (!config.keepHighlights) {
    const pixels = context.getImageData(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < pixels.data.length; i += 4) {
      const lightestBackground = Math.min(pixels.data[i], pixels.data[i + 1], pixels.data[i + 2]);
      pixels.data[i + 3] *= Math.min(1, Math.max(0, (220 - lightestBackground) / 45));
    }
    context.putImageData(pixels, 0, 0);
  }
  // Support the narrow photographed rims where specular highlights become
  // transparent in the matte, using the same calibrated lens contours.
  context.globalCompositeOperation = "destination-over";
  context.strokeStyle = config.rimColor ?? (config.keepHighlights ? "#8d9092" : "#2e3537");
  context.lineWidth = config.referenceWidth * (config.keepHighlights ? 0.0015 : 0.0035);
  config.lenses.forEach((path) => context.stroke(new Path2D(path)));
  context.globalCompositeOperation = "source-over";
  if (config.tint) {
    context.fillStyle = config.tint;
    config.lenses.forEach((path) => context.fill(new Path2D(path)));
  }
  return canvas;
}
