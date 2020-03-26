// @ts-check
import { addOne, solution } from "./function";
import expectExport from "expect";

describe("the addOne function", () => {
    test("adds one to any number that is passed to it", () => {
        // act
        const two = addOne(1);
        const ten = addOne(9);
        // const nan = addOne();
        // assert
        expect(two).toEqual(2);
        expect(ten).toEqual(10);
        // expect(isNaN(nan)).toBeTruthy();
    });

    test("retuns correct", () => {
        const a = solution("nndfddf");
        const b = solution("aabcdefaf");
        const c = solution(
            "NqyOMXRjclIesWnrJegZkwmwIZBxkXqDrsmKXKWBHRFqDoWJPAKGshRbAJgiJcdAhTBONxPWBSgdhNBSeOdmyBJtxHNddVFiCdqjcmuMZPgeORKXGFGlSurVNRmyeTvntoLMCNwamAdsBAECFcyhObznJRUgoUgMFJzuaVBNgGzJkTRfjpSPSEyUgfLatFkiAthVZGyygxzFlwoFxdMahfhCEPSaTutbpLlCKncrsrTXSgjUkdxKELDlillFHMTKNhsHdsvMSsugutHhEWCJYzHARaYUWrYHUKCSuBMptpQuWQhBNgXHrQqJzotXSLzQnFmpeJjKQrxhzMMicHEWUVHMxQXFttaWSgYUmvYQKiyePnBOHJGFzZWuSDNtkJtzmjqtaAigNMglOyMcmJdDAJzwsXDyVpZtDYujZhMUIoFfYCpFTpIXVHwAJFzfdwUdEuZkLuZWxoIOfEKLzuVIRcxUCiVlXVLjOpvzIosvizpgROjqWPstsuJogBlWbbDDDalcODicKMTudehbguEHYjpZIoeuqIPPOcRalTSPRPnshoKQeikngHszxnNfOjBrbgJsUvFRIbyZJACEDivbRbdyTflPfNTsFvwzOqIuhyWhLrgLGIXAQSBqYvKcObfIlyFYkcTOhTDfTGTkuVedjflacZFWoAwlzeerClhPTuUGoEfckiEqTYJKnYpEnOWFdIkTwABHEVLGuCnInIgQGEKbQQyJKsHjTIRyFYXaPupXoaPqpqKhvoYxOklTdQZKBMnufUyZZXRutctUwgUzebbQdrEXeythIoftcxDnMWrsdMdBuYvuusvSqRVLxMTexsIuRpyQPRgWMyhoinOpvqmxMiNZsKCTfLdArOuFoedToRpTYixliyThAhoxQiBvhOEeJqNVUSmoCVejizGdLghIBFECbZEHZuYAMtTWoubcCaydOaSyviLELkJCOQAHPrarWlUytURLhTZSrGJtgGvSerfxkUMsTVNoNIOEticUrGkmpqvfOOOwKAfKKcvUWGRukhrSGSpoJxfACqnFugGBcthpYzMrgFjBEHPboFjFzwRnQXkbGWidnHnfzGVpKqwYQntNIaEDcykrTbiYoejaNVDFoQCJFoeaKoovSZvGlWzsKFUgNOJBUzgYZJkfuZUCfRjDRyORZuOkDPcakQhgAJvggUZCiwojubNIhxKPtYfQukaKSHRKYGrIbUisBiJVCbQILweGFhQfRtwwjrxdIRRKpIXQkfopJaraPrTWblcIBWfgVrAbJIWqdCUdqLwehaIXPksjRtQASVpEYYQuXtCEWAOfqRUyjfLufzuVpEvwlwisXDltRdAweWDopnLzIkHxUuHXIDqHwcfaaRZSpcguVcgaRvsxTLwbQHQWPtjwhiKLnbgAKbziRKxESomiyLiNMIoVNrdDMrJNGqMhhuDSSFEHZHdybgfTkNbwUxsFRNeiuEFZzciLXTMvdiyLQyvgbqgAqbdsXBFPpjbRnbQdWeFnDolORaEIfiWwysSOplXjnThmpNliZzGHpEUPAfhabNOPHnbrlqFZsMbZKwiuBlGlpJeOKgyVcrPBHLKAcsvTuxqBgztWKbszGwGEKofNczFlgMfFoJUcPxRyPazpiyjlYWMVfUkKrkFDoMrgcRHSapYQpJVcAqJeynVRmQOPlFsuIMmUvsEDKXKtWxctCTqcrWyierHfjmTChiLJjMnNnpZJrFqAOacXVBZepJLYFkRjJAhbbamavVslizUvDFXdzMluMrSHfHhbriVVQKGfOUErbcqWTKXlKkjAVKWpKIdaHdhGOMbqMRPGLJMkZBwjbToiylLGNceSuEMyBnnniKxBQbvFiQfIjsvvJnutdeJOMIpsFnQliqHuYYdfnnVlMawmsWWEUPFJtxnGcVKRZbBItkAcxmgQEvUNhnLMHPgjTGVUqkKXVWdrvZKralJimwLQvKlJZiesnNnDuHvgoxzcnRYIdvBvbZMxarLddTYkgilgmC"
        );
        const d = solution(
            "RPpWVwvtnnWitdosJKdTynNhaKteXRdymNicJroyaWttYgZDNkovHsBYzALOuiYJdfpwqzQwxcFQUXCJAVBLxbePwMxbrrPgpJZSPVXsDpNdxSVAwcRPUvQrrefrxvHqjIwAvGgjngTYwlPTjWPYeISUsinlzUoaCQOfUVyWkXeOxVMJjAhBMmQgAeMWpjlrFbWhpRDJBLnyCarRRVbIejfcskZhvXQLeStydJaCFwIxWTdGXGOhfnuCvSCOVCcEtoAfwjGZXNMomDWTdyPoblthyGRdzPGMThMrrErNlGlnQcsDVhVsEEppcDgxIKUGYHRjyvKSFfVIWbFlakkdzFQlrKvebAyDxVWLncDqQSBdQwOOplUpUEwNKWMuXVpgHfapQpgXmHsardnuuObpHOTfaRAyBRRZfhEJTSHrgocNBWQQKIyrzCadEQmeVlcVrxLEwDWuMCbjPrWFuVHCOwOobrNduWVhIeXbbyIsodFwEqtLXFWyqeAuCyVOXjIocAxtKoTtNrQCfLeOScKhlxVYkoImWxhRCoSQwECxFJsfSKwNUHQFCYwNnHqGjZDJheRrVkaEsnkNPNztjYoQMIAUoKoAzNcsayxnUqCVxXhLpXnpnQTbDAJWHXizofLOHAVAMJVbUxmxUgQKrTLuOvjocixsFTAZGmkpHRcllQWwlUnANarBkZOyvvRTvLyjnWWaJtwPFdamDDnxkcAVHViHzDGOughExYOOggTNHceOuLEGiaMELjkAitHYHpiLVRHoUauLuugaEaEyYOYKikmYtEjTrikmjlivUxIKz"
        );

        expectExport(a).toBe(3);
        expectExport(b).toBe(6);
        expectExport(c).toBe(26);
        expectExport(d).toBe(25);
    });
});
