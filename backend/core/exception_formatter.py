from drf_standardized_errors.formatter import ExceptionFormatter
from dataclasses import asdict


class CustomExceptionFormatter(ExceptionFormatter):
    def format_error_response(self, error_response):
        standardized_errors = asdict(error_response)
        standardized_errors["summaries"] = []
        for error in standardized_errors["errors"]:
            attr = (
                error["attr"].capitalize() + ": "
                if error["attr"] != "non_field_errors"
                else ""
            )
            detail = error["detail"]
            standardized_errors["summaries"].append(f"{attr}{detail}")
        return standardized_errors
